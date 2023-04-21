"use client";

import React, { useEffect, useState } from "react";
import { PokemonTCG } from "pokemon-tcg-sdk-typescript";
import { useParams } from "next/navigation";

const Set = () => {
  const params = useParams();
  const [allPokemons, setAllPokemons] = useState<PokemonTCG.Card[]>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await PokemonTCG.findCardsByQueries({ q: `set.id:${params?.set}` })
        .then((data) => {
          setAllPokemons(data);
          setIsLoading(false);
        })
        .catch(() => {
          console.log("error");
          setIsLoading(false);
        });
    };
    fetchData();
  }, [params?.set]);

  console.log("alla", allPokemons);

  return (
    <>
      {allPokemons?.length && allPokemons?.length > 0 ? (
        <div>Pokemons Fetched</div>
      ) : isLoading ? (
        <div>Loading</div>
      ) : (
        <div>No pokemons found for set {params?.set}</div>
      )}
    </>
  );
};

export default Set;
