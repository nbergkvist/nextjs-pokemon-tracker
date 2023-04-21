"use client";

import React, { useEffect, useState } from "react";
import { PokemonTCG } from "pokemon-tcg-sdk-typescript";
import { useParams } from "next/navigation";
import Pokemon from "@/components/pokemon/pokemon";
import Link from "next/link";

async function getData(id: string) {
  const res = await PokemonTCG.findCardsByQueries({ q: `set.id:${id}` });
  return res;
}

const Set = () => {
  const params = useParams();
  const [allPokemons, setAllPokemons] = useState<PokemonTCG.Card[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData(params?.set).then((data) => {
      setAllPokemons(data);
      setIsLoading(false);
    });
  }, [params?.set]);

  return (
    <div className="flex flex-col h-full">
      <header>HEADER</header>
      <div
        className="grow overflow-auto grid gap-4 m-4 justify-items-center"
        style={{
          gridTemplateColumns: "repeat( auto-fit, minmax(100px, 1fr) )",
        }}
      >
        {allPokemons?.length && allPokemons?.length > 0 ? (
          allPokemons.map((pokemon) => (
            <Pokemon key={pokemon.id} pokemon={pokemon} />
          ))
        ) : isLoading ? (
          <div>Loading</div>
        ) : (
          <div>No pokemons found for set {params?.set}</div>
        )}
      </div>
      <footer>
        <Link href={`/`}>
          <div className="bg-purple h-[50px] rounded mx-4 mb-4 text-black flex items-center justify-center">
            Back to sets
          </div>
        </Link>
      </footer>
    </div>
  );
};

export default Set;
