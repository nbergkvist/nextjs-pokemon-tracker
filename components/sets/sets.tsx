import { PokemonTCG } from "pokemon-tcg-sdk-typescript";
import Link from "next/link";
import { useEffect, useState } from "react";
import { signOutUser } from "@/firebase/auth/auth";
import { useRouter } from "next/navigation";

const fetchData = async () => {
  const sets = await PokemonTCG.findSetsByQueries({
    q: `legalities.standard:legal`,
  });
  return sets;
};

const Sets = () => {
  const [allSets, setAllSets] = useState<PokemonTCG.Set[]>();
  const router = useRouter();

  const signOut = () => {
    signOutUser();
    router.push("/");
  };

  useEffect(() => {
    fetchData()
      .then((data) => {
        setAllSets(data);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="flex flex-col h-full relative">
      <div
        className="grow overflow-auto"
      >
        {allSets ? (
          <div className="grow overflow-auto">
            {allSets
              ?.slice(0)
              .reverse()
              .map((set) => (
                <Link
                  key={set.id}
                  href={`/sets/${set.id}`}
                  className="flex items-center flex-col mx-10 p-2 my-4 border rounded-xl border-solid border-purple"
                >
                  <img
                    alt={set.name}
                    src={set.images.logo}
                    className="h-[80px]"
                  />
                  <p>{set.name}</p>
                </Link>
              ))}
          </div>
        ) : (
          <div>Loading</div>
        )}
      </div>
      <footer className="flex">
        <button
          className="grow h-[42px] bg-purple text-black mx-4 mb-4"
          onClick={signOut}
        >
          Signout
        </button>
      </footer>
    </div>
  );
};

export default Sets;
