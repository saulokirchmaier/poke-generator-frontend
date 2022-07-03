import { useState } from 'react';
import { Button as muiButton, TextField, Typography } from '@mui/material';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import pokebola from '../../imagens/logo.png';
import { pokemonService } from '../../service';
import { Load } from '../../components';

const Page = styled.div`
  height: 100vh;
  width: 100vw;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  padding: 16px;
  text-align: center;
`;

const Content = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  justify-content: space-evenly;
`;

const Button = styled(muiButton)`
  width: 450px;
`;

const Container = styled(Content)`
  min-height: 400px;
  min-width: 400px;
  box-shadow: 8px 8px 4px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  background-color: #EDF2F4;
  justify-content: center;
  gap: 8px;
`;

const Image = styled.img`
  max-height: 250px;
  max-width: 250px;
`;

const initialState = {
  originalName: '',
  name: '',
  pokemonId: null,
  picture: '',
};

const Main = () => {
  const [pokemon, setPokemon] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);

    const doc = await pokemonService.generete();
    
    setPokemon({
      ...pokemon,
      originalName: doc.name,
      pokemonId: doc.id,
      picture: doc.sprites.other.home.front_default || doc.sprites.front_default,
    });
    setLoading(false);
  };

  const save = async () => {
    setLoading(true);

    await pokemonService.create(pokemon);

    setPokemon(initialState)
    setLoading(false);
  };

  return (
    <Page>
      <Header>
        <Typography variant='h3'>Gerador de Pokemons</Typography>
      </Header>

      <Content>
        <Button variant='contained' onClick={generate}>Gerar Novo Pokemon</Button>
        {!pokemon.pokemonId ?
          <Container>
            <Typography>Gere um pokemon para comecar</Typography>
            <Image src={pokebola} alt="Pokebola" />
          </Container>
          :
          <Container>
            <Typography variant='h5'>{pokemon.originalName.toUpperCase()}</Typography>
            <Image src={pokemon.picture} alt="Pokemon" />
            <TextField label='Nome' variant='filled' onChange={(e) => setPokemon({...pokemon, name: e.target.value})} />
          </Container>
        }
        <Button
          variant='contained'
          disabled={!pokemon.pokemonId || pokemon.name === ''}
          onClick={save}
        >
          Salvar Pokemon
        </Button>
        <Link to="/all" style={{ textDecoration: 'none' }}>
          <Button variant='outlined'>Pokemons Salvos</Button>
        </Link>
        <Load load={loading} />
      </Content>

    </Page>
  )
}

export default Main;
