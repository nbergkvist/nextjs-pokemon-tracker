import { PokemonTCG } from "pokemon-tcg-sdk-typescript";
import Link from "next/link";

type Props = {
  pokemon: PokemonTCG.Card;
};

const Pokemon = (props: Props) => {
  const { pokemon } = props;
  return (
    <div>
        <img
          alt={pokemon.name}
          src={pokemon.images.small}
          className="w-[100px]"
        />
    </div>
  );
};

export default Pokemon;
