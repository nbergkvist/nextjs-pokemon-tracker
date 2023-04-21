import { PokemonTCG } from "pokemon-tcg-sdk-typescript";
import Link from "next/link";

type Props = {
  allSets: PokemonTCG.Set[];
};

const Sets = (props: Props) => {
  const { allSets } = props;
  return (
    <div>
      {allSets
        .slice(0)
        .reverse()
        .map((set) => (
          <Link key={set.id} href={`/${set.id}`}>
            <div className="flex items-center flex-col mx-10 p-2 my-4 border rounded-xl border-solid border-purple">
              <img alt={set.name} src={set.images.logo} className="h-[80px]" />
              <>{console.log(set.images)}</>
              <p>{set.name}</p>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default Sets;
