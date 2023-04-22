import React, { ChangeEvent, useEffect, useState } from "react";
import { PokemonTCG } from "pokemon-tcg-sdk-typescript";
import { useParams } from "next/navigation";
import Pokemon from "@/components/pokemon/pokemon";
import Link from "next/link";
import getData from "@/firebase/getData";
import addData from "@/firebase/addData";
import { getCurrentUser } from "@/firebase/auth/auth";
import PokemonOverlay from "../pokemon/pokemonoverlay";

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
  data: Array<PokemonTCG.Card & { isCollected?: boolean }>
) => {
  const { result, error } = await addData(user, id, { data });
  return { result, error };
};

const Set = () => {
  const params = useParams();
  const [allPokemons, setAllPokemons] =
    useState<Array<PokemonTCG.Card & { isCollected?: boolean }>>();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<{}>();
  const [filteredPokemon, setFilteredPokemon] =
    useState<Array<PokemonTCG.Card & { isCollected?: boolean }>>();
  const [filter, setFilter] = useState<string>("");
  const [dropdownOpen, setDropwdownOpen] = useState<boolean>(false);
  const [quickEdit, setQuickEdit] = useState<boolean>(false);
  const [showOwned, setShowOwned] = useState<boolean>(false);
  const [showUnOwned, setShowUnOwned] = useState<boolean>(false);
  const [selectedPokemonIndex, setSelectedPokemonIndex] = useState<
    number | undefined
  >(undefined);

  useEffect(() => {
    getCurrentUser().then((user) => {
      if (user) {
        setUserData(user);
        getFirebaseData(params?.set, user)
          .then((data) => {
            if (data.result?.data()) {
              setAllPokemons(data.result?.data()?.data);
              setFilteredPokemon(data.result?.data()?.data);
              setIsLoading(false);
            } else {
              getDataa(params?.set)
                .then((data) => {
                  setAllPokemons(data);
                  setFilteredPokemon(data);
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

  const changeCollected = (id: string) => {
    const newPokemonData = allPokemons?.map((pokemon) => {
      if (pokemon.id === id) {
        pokemon.isCollected = !pokemon.isCollected;
      }
      return pokemon;
    });
    if (newPokemonData) {
      setFirebaseData(userData, params?.set, newPokemonData);
      setAllPokemons(newPokemonData);
      setFilteredPokemon(newPokemonData);
    }
  };

  const filterOwned = () => {
    if (showUnOwned) {
      setShowUnOwned(false);
    }
    setShowOwned(!showOwned);
  };

  const filterUnOwned = () => {
    if (showOwned) {
      setShowOwned(false);
    }
    setShowUnOwned(!showUnOwned);
  };

  // useEffect(() => {
  //   if (filter) {
  //     const filtered = filteredPokemon?.filter((pokemon) =>
  //       pokemon.name.toLowerCase().includes(filter.toLowerCase())
  //     );
  //     setFilteredPokemon(filtered);
  //   } else if (!showOwned && !showUnOwned) {
  //     setFilteredPokemon(allPokemons);
  //   }
  // }, [filter, showOwned, showUnOwned]);

  useEffect(() => {
    if (showOwned) {
      const filtered = allPokemons?.filter((pokemon) => pokemon.isCollected);
      if (filter) {
        const searchFilter = filtered?.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(filter.toLowerCase())
        );
        setFilteredPokemon(searchFilter);
      } else {
        setFilteredPokemon(filtered);
      }
    } else if (showUnOwned) {
      const filtered = allPokemons?.filter((pokemon) => !pokemon.isCollected);
      if (filter) {
        const searchFilter = filtered?.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(filter.toLowerCase())
        );
        setFilteredPokemon(searchFilter);
      } else {
        setFilteredPokemon(filtered);
      }
    } else if (filter) {
      const filtered = allPokemons?.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(filter.toLowerCase())
      );
      setFilteredPokemon(filtered);
    } else {
      setFilteredPokemon(allPokemons)
    }
  }, [showUnOwned, showOwned, filter]);

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  return (
    <div className="flex flex-col h-full relative">
      <header className="flex w-full relative">
        <input
          type="text"
          id="first_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm block grow p-2.5"
          placeholder="Search"
          value={filter}
          onChange={handleFilterChange}
        />
        <div className="w-[50px] flex items-center justify-center">
          <button
            className="w-[32px]"
            onClick={() => setDropwdownOpen(!dropdownOpen)}
          >
            <svg
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
              ></path>
            </svg>
          </button>
        </div>
        <div
          className={`absolute top-[45px] left-0 w-full p-4 bg-darkbg z-10 ${
            dropdownOpen ? "block" : "hidden"
          }`}
        >
          <div className="flex mb-4">
            <p className="grow">Quick add mode</p>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                value=""
                checked={quickEdit}
                onChange={() => setQuickEdit(!quickEdit)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-darkbg peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-transparent rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-purple after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple"></div>
            </label>
          </div>
          <div className="flex mb-4">
            <p className="grow">Show owned</p>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                value=""
                checked={showOwned}
                onChange={() => filterOwned()}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-darkbg peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-transparent rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-purple after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple"></div>
            </label>
          </div>
          <div className="flex mb-4">
            <p className="grow">Show unowned</p>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                value=""
                checked={showUnOwned}
                onChange={() => filterUnOwned()}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-darkbg peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-transparent rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-purple after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple"></div>
            </label>
          </div>
        </div>
      </header>
      <div
        className="grow overflow-auto grid gap-4 m-4 justify-items-center"
        style={{
          gridTemplateColumns: "repeat( auto-fit, minmax(100px, 1fr) )",
          gridTemplateRows: "auto auto 1fr 1fr 1fr auto auto",
        }}
      >
        {filteredPokemon?.length && filteredPokemon?.length > 0 ? (
          filteredPokemon.map((pokemon, index) => (
            <button
              key={pokemon.id}
              onClick={() =>
                quickEdit
                  ? changeCollected(pokemon.id)
                  : setSelectedPokemonIndex(index)
              }
            >
              <Pokemon pokemon={pokemon} />
            </button>
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
      {selectedPokemonIndex !== undefined && filteredPokemon && (
        <PokemonOverlay
          allPokemons={filteredPokemon}
          selectedPokemonIndex={selectedPokemonIndex}
          setSelectedPokemonIndex={setSelectedPokemonIndex}
          changeCollected={changeCollected}
        />
      )}
    </div>
  );
};

export default Set;
