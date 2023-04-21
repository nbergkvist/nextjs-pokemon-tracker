import React, { useEffect, useState } from "react";
import { PokemonTCG } from "pokemon-tcg-sdk-typescript";
import { useParams } from "next/navigation";
import Pokemon from "@/components/pokemon/pokemon";
import Link from "next/link";
import getData from "@/firebase/getData";
import addData from "@/firebase/addData";
import { getCurrentUser } from "@/firebase/auth/auth";

async function getDataa(id: string) {
  const res = await PokemonTCG.findCardsByQueries({ q: `set.id:${id}` });
  return res;
}

const getFirebaseData = async (id: string, user: any) => {
  const { result, error } = await getData(user, id);
  return { result, error };
};

const setFirebaseData = async (
  user: any,
  id: string,
  data: PokemonTCG.Card[]
) => {
  const { result, error } = await addData(user, id, { data });
  return { result, error };
};

const Set = () => {
  const params = useParams();
  const [allPokemons, setAllPokemons] = useState<PokemonTCG.Card[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCurrentUser().then((user) => {
      if (user) {
        getFirebaseData(params?.set, user)
          .then((data) => {
            if (data.result?.data()) {
              setAllPokemons(data.result?.data()?.data);
              setIsLoading(false);
            } else {
              getDataa(params?.set)
                .then((data) => {
                  setAllPokemons(data);
                  setFirebaseData(user, params?.set, data);
                  setIsLoading(false);
                })
                .catch(() => setIsLoading(false));
            }
          })
          .catch(() => setIsLoading(false));
      }
    });
  }, [params?.set]);

  return (
    <div className="flex flex-col h-full">
      <header>Header</header>
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
        <Link href={`/sets`}>
          <div className="bg-purple h-[50px] rounded mx-4 mb-4 text-black flex items-center justify-center">
            Back to sets
          </div>
        </Link>
      </footer>
    </div>
  );
};

export default Set;
