import { PokemonTCG } from "pokemon-tcg-sdk-typescript";
import Link from "next/link";
import { useEffect, useState } from "react";
import { signOutUser } from "@/firebase/auth/auth";
import { useRouter } from "next/navigation";

const fetchData = async () => {
  const sets = await PokemonTCG.getAllSets();
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
    fetchData().then((data) => {
      setAllSets(data);
    }).catch(console.error);
  }, []);

  return (
    <div>
      <button onClick={signOut}>Signout</button>
      {allSets?.slice(0)
        .reverse()
        .map((set) => (
          <Link
            key={set.id}
            href={`/${set.id}`}
            className="flex items-center flex-col mx-10 p-2 my-4 border rounded-xl border-solid border-purple"
          >
            <img alt={set.name} src={set.images.logo} className="h-[80px]" />
            <p>{set.name}</p>
          </Link>
        ))}
    </div>
  );
};

export default Sets;
