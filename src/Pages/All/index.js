import { useEffect, useState } from 'react';
import { Button as muiButton, Typography } from '@mui/material';
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
  flex-direction: row;
  align-items: center;
  gap: 32px;
  justify-content: space-evenly;
  max-width: 1200px;
  flex-wrap: wrap;
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
  flex-direction: column;
  gap: 8px;
`;

const Image = styled.img`
  max-height: 250px;
  max-width: 250px;
`;

const Main = () => {
  const [loading, setLoading] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  
  useEffect(() => {
    const getAll = async () => {
      setLoading(true);

      const doc = await pokemonService.getAll();

      setPokemons(doc);
      setLoading(false);
    }

    getAll();
  }, []);

  return (
    <Page>
      <Header>
        <Typography variant='h3'>Pokemons</Typography>
      </Header>

      <Content>        
        <Link to="/" style={{ textDecoration: 'none' }}>
            <Button variant='outlined'>Gerar novo Pokemon</Button>
        </Link>
      </Content>

      <Content>
        {pokemons.length === 0 ?
          <Container>
            <Typography>Sem Pokemons salvos</Typography>
            <Image src={pokebola} alt="Pokebola" />
          </Container>
          :
          pokemons.map((e) => <Container key={e.id}>
          <Typography variant='h5'>{e.name.toUpperCase()}</Typography>
          <Image src={e.picture} alt="Pokemon" />
        </Container>)
        }
        <Load load={loading} />
      </Content>

    </Page>
  )
}

export default Main;
