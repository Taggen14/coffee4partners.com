'use client'

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import {
    CommandDialog,
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandGroup,
    CommandItem
} from "@/components/ui/command";
import { redirect } from "next/navigation";

type SearchResult = {
    id: string;
    title: string;
    type: "product" | "category" | "page";
    url: string;
};

type SearchBarProps = {
    isSearchOpen: boolean;
    setIsSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SearchBar = ({ isSearchOpen, setIsSearchOpen }: SearchBarProps) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setIsSearchOpen((isSearchOpen) => !isSearchOpen);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const performSearch = async (searchQuery: string) => {
        if (searchQuery.length < 2) {
            setResults([]);
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
            const data = await response.json();
            setResults(data);
        } catch (error) {
            console.error("Error searching:", error);
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            performSearch(query);
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [query]);

    const handleSelect = (result: SearchResult) => {
        setIsSearchOpen(false);
        redirect(result.url);
    };

    return (
        <>
            <CommandDialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
                <CommandInput
                    placeholder="Sök produkter, kategorier..."
                    value={query}
                    onValueChange={setQuery}
                    ref={inputRef}
                />
                <CommandList>
                    <CommandEmpty>
                        {loading ? "Söker..." : "Inga resultat hittades (test komponent)."}
                    </CommandEmpty>
                    <CommandGroup heading="Resultat">
                        {results.map((result) => (
                            <CommandItem
                                key={result.id}
                                onSelect={() => handleSelect(result)}
                                className="flex items-center"
                            >
                                <div className="mr-2">
                                    {result.type === "product" && "🛒"}
                                    {result.type === "category" && "📂"}
                                    {result.type === "page" && "📄"}
                                </div>
                                <span>{result.title}</span>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    );
};