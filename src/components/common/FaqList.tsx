import FaqItem from "./FaqItem";

const faqs = [
  {
    question: "Hur stor skall öppningen vara?",
    answer:
      "Dagöppningen ska vara som den beställda porten. Takskjutportar monteras helt på insida vägg och inte i karmen. Beställer du tex en port med måtten 2500x2000 bxh skall hålet vara när du är helt färdig med smygar etc 2500x2000mm",
  },
  {
    question: "Vad är utrymmeskrav?",
    answer:
      "Det är utrymmet som krävs för att kunna montera porten, på sidorna krävs det 85mm på vardera sida om portens hålmått, samt ovan porten krävs det 125mm ovan portens höjd vid dragfjäder. Vid torsionsfjäder krävs det 225mm ovan portens höjd.",
  },
  {
    question: "Kan jag köpa en manuell port av er?",
    answer: "Nej, alla våra portar säljs endast ihop med motor.",
  },
  {
    question: "Klarar jag av att montera själv?",
    answer:
      "Självklart, de flesta av våra kunder monterar själv med hjälp av den medföljande manualen. Där beskrivs hela montaget steg för steg samt för alla tillbehör.",
  },
  {
    question:
      "Jag har köpt två portar, kan jag styra dem med samma fjärrkontroll?",
    answer:
      "Ja det kan du, medföljande fjärrkontroller har 4st kanaler. Vilket betyder att du kan styra fyra olika portar på samma fjärrkontroll.",
  },
];

export default function FaqList() {
  return (
    <div data-searchable="true" className="space-y-4">
      {faqs.map((faq, index) => (
        <FaqItem key={index} question={faq.question} answer={faq.answer} />
      ))}
    </div>
  );
}
