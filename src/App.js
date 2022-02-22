import "./App.css";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";

const PokemonRow = ({ pokemon, onSelect }) => (
  <tr>
    <td>{pokemon.name.english}</td>
    <td>{pokemon.type.join(", ")}</td>
    <td>
      <Button variant="contained" onClick={() => onSelect(pokemon)}>
        Select!
      </Button>
    </td>
  </tr>
);

PokemonRow.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.shape({
      english: PropTypes.string.isRequired,
    }),
    type: PropTypes.arrayOf(PropTypes.string.isRequired),
  }),
  onSelect: PropTypes.func,
};

const PokemonInfo = ({ name, base }) => (
  <div>
    <h1>{name.english}</h1>
    <table>
      <tbody>
        {Object.keys(base).map((key) => (
          <tr key={key}>
            <td>{key}</td>
            <td>{base[key]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

PokemonInfo.propTypes = {
  name: PropTypes.shape({
    english: PropTypes.string,
  }),
  base: PropTypes.shape({
    HP: PropTypes.number.isRequired,
    Attack: PropTypes.number.isRequired,
    Defense: PropTypes.number.isRequired,
    "Sp. Attack": PropTypes.number.isRequired,
    "Sp. Defense": PropTypes.number.isRequired,
    Speed: PropTypes.number.isRequired,
  }),
};

const Title = styled.h1`
  text-align: center;
`;

const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
  grid-column-gap: 1rem;
`;

const Container = styled.div`
  margin: auto;
  width: 800px;
  paddingtop: 1rem;
`;

const Input = styled.input`
  font-size: x-large;
  width: 100%;
  padding: 0.2rem;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: "",
      pokemon: [],
      selectedItem: null,
    };
  }

  // instead of useEffect
  componentDidMount() {
    fetch("http://localhost:3000/react-basic/pokemon.json")
      .then((resp) => resp.json())
      .then((pokemon) =>
        this.setState({
          ...this.state,
          pokemon,
        })
      );
  }

  render() {
    return (
      <Container>
        <Title>Pokemon Search</Title>

        <TwoColumnLayout>
          <div>
            <Input
              type="text"
              value={this.state.filter}
              onChange={(evt) =>
                this.setState({
                  ...this.state,
                  filter: evt.target.value,
                })
              }
            />
            <table width="100%">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {this.state.pokemon
                  .filter((pokemon) =>
                    pokemon.name.english
                      .toLowerCase()
                      .includes(this.state.filter.toLowerCase())
                  )
                  .slice(0, 20)
                  .map((pokemon) => (
                    <PokemonRow
                      pokemon={pokemon}
                      key={pokemon.id}
                      onSelect={() =>
                        this.setState({
                          ...this.state,
                          selectedItem: pokemon,
                        })
                      }
                    />
                  ))}
              </tbody>
            </table>
          </div>

          {this.state.selectedItem && (
            <PokemonInfo {...this.state.selectedItem} />
          )}
        </TwoColumnLayout>
      </Container>
    );
  }
}

// function App() {
//   const [filter, setFilter] = useState("");
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [pokemon, setPokemon] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:3000/react-basic/pokemon.json")
//       .then((resp) => resp.json())
//       .then((data) => setPokemon(data));
//     return () => {
//       console.log("clean effect");
//     };
//   }, []);

//   return (
//     <Container>
//       <Title>Pokemon Search</Title>

//       <TwoColumnLayout>
//         <div>
//           <Input
//             type="text"
//             value={filter}
//             onChange={(evt) => setFilter(evt.target.value)}
//           />
//           <table width="100%">
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Type</th>
//               </tr>
//             </thead>
//             <tbody>
//               {pokemon
//                 .filter((pokemon) =>
//                   pokemon.name.english
//                     .toLowerCase()
//                     .includes(filter.toLowerCase())
//                 )
//                 .slice(0, 20)
//                 .map((pokemon) => (
//                   <PokemonRow
//                     pokemon={pokemon}
//                     key={pokemon.id}
//                     onSelect={() => setSelectedItem(pokemon)}
//                   />
//                 ))}
//             </tbody>
//           </table>
//         </div>

//         {selectedItem && <PokemonInfo {...selectedItem} />}
//       </TwoColumnLayout>
//     </Container>
//   );
// }

export default App;
