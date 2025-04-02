import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ inquiryId: string }> },
) {
  const { inquiryId } = await params;

  const encoder = new TextEncoder();
  let lastMessageId: string | null = null;
  let lastTypingCheck = new Date();

  const stream = new ReadableStream({
    async start(controller) {
      const sendEvent = (event: string, data: unknown) => {
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ type: event, data })}\n\n`),
        );
      };

      const checkForUpdates = async () => {
        try {
          // Check for new messages
          const messages = await prisma.message.findMany({
            where: {
              inquiryId,
              ...(lastMessageId && {
                id: {
                  not: lastMessageId,
                },
              }),
            },
            orderBy: {
              createdAt: "desc",
            },
            take: 1,
          });

          if (messages.length > 0) {
            lastMessageId = messages[0].id;
            sendEvent("message", messages[0]);
          }

          // Check for typing indicators
          const typing = await prisma.typingIndicator.findMany({
            where: {
              inquiryId,
              updatedAt: {
                gt: lastTypingCheck,
              },
            },
          });

          if (typing.length > 0) {
            lastTypingCheck = new Date();
            sendEvent("typing", typing);
          }
        } catch (error) {
          console.error("Error checking for updates:", error);
        }
      };

      // Initial check
      await checkForUpdates();

      // Set up interval for periodic checks
      const interval = setInterval(checkForUpdates, 1000);

      // Clean up on close
      request.signal.addEventListener("abort", () => {
        clearInterval(interval);
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
