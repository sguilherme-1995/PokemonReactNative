import React from 'react'
import axios from 'axios'
import {ActivityIndicator, View, Text, TextInput, Button, Alert, Image, TouchableOpacity, Linking, ScrollView} from 'react-native'

class Pokemons extends React.Component {
  constructor(){
    super()
    this.state={
      pokemon: '',
      tipo: '',
      habilidade: '',
      img: '',
      nome: '',
      efeito: '',
      id: '',
      exp_base: '',
      altura: 0,
      peso: 0,
      loading: false,
      error: false
    }
  }
  
  abrirLinkPokeApi = () => {
   const open = Linking.openURL('https://pokeapi.co/docs/v2.html#pokemon')
  }

  pegaPokemon = () => {
    this.setState({loading:true})
    setTimeout(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${this.state.nome.toLowerCase()}/`)
      .then(res => {
        this.setState({
          pokemon: res.data.name, 
          img: res.data.sprites.front_default, 
          tipo: res.data.types.map(tipo => tipo.type.name).join(', '),
          habilidade: res.data.abilities.map(ability => ability.ability.name).join(', '),
          id: res.data.id,
          exp_base: res.data.base_experience,
          altura: res.data.height,
          peso: res.data.weight
        })
        this.setState({nome: ''})
        this.setState({loading:false})
      })
      .catch(err => Alert.alert('🤦🏾‍♂️Opps... Something is going wrong, try again!'),
        this.setState({nome: ''}),
        this.setState({loading:false})
      )
    }, 2500);
  }


  pokemonsDoMesmoTipo = () => {

  }
  
  efeitoDeHabilidade = () => {
    this.state.habilidade.map(hab =>{
      axios.get(`https://pokeapi.co/api/v2/ability/${hab}/`)
        .then(res =>{
          this.setState({efeito: res.data.effect_entries.map(eff => eff.effect).join('\n')})
        })
    }) 
  }


  render(){ 
    return(
      <ScrollView style={{flex: 1, marginVertical: 50}}>
        <View style={{
          flexDirection: 'column', 
          justifyContent: "center", 
          alignItems: "flex-start", 
          width: 500, 
          height: 150,
          }}>
            
          <TextInput style={{
            width: 300,
            height: 40,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: '#ded126',
            margin: 5,
            marginLeft: 30
          }}
          placeholder = 'Name or Id of the Pokémon'
          onChangeText = {(text)=> this.setState({nome: text})}
          value = {this.state.nome}
          />
        <View style={{height: 50, width: 250, marginVertical: 20, marginLeft: 55}}> 
          <Button onPress={this.pegaPokemon}  title = 'Search' color = '#ded126'/>
          {/* <ActivityIndicator size="large" color="#0000ff" /> */}
        </View>
        </View>
          <Image source={require('./src/imgs/imgPokeApi.gif')} style={{height: 150, width: 300,margin: 25, borderRadius: 10}}/>
          {this.state.loading
              ? <ActivityIndicator size="large" color="#0000ff" />
              : this.state.error
                
            }
        <View>
        <TouchableOpacity onPress={this.abrirLinkPokeApi}>
        </TouchableOpacity>
        </View>
        <View style={{justifyContent: "space-around", flexDirection: 'row'}}>
          <View style={{
            width: 350, 
            height: 260, 
            backgroundColor: '#f0f0f0', 
            borderRadius: 10, 
            marginVertical: 10,
            justifyContent: "center",
            alignItems: "center"
            }}>
            <Image source={{uri: this.state.img}} style={{width: 150, height: 150,}} />
          </View>
          </View>
          <View style={{justifyContent: "space-around", flexDirection: 'row'}}>
          <View style = {{
            width: 350, 
            height: 260, 
            backgroundColor: 'gold', 
            borderRadius: 10, 
            marginVertical: 10,
            }}>
              <Text style={{margin: 8, marginVertical: 8, borderStartColor: 'black'}}>
                Name: {this.state.pokemon}
              </Text>
              <Text style={{margin: 8, marginVertical: 8, flexDirection: 'column'}}>
                Type(s): {this.state.tipo}
              </Text>
              <Text style={{margin: 8, marginVertical: 8, flexDirection: 'column'}}>
                Abilities: {this.state.habilidade}
              </Text>
              <Text style={{margin: 8, marginVertical: 8, flexDirection: 'column'}}>
                ID: {this.state.id}
              </Text>
              <Text style={{margin: 8, marginVertical: 8, flexDirection: 'column'}}>
                Base exp: {this.state.exp_base}
              </Text>
              <Text style={{margin: 8, marginVertical: 8, flexDirection: 'column'}}>
                Height: {this.state.altura * 10}cm 
              </Text>
              <Text style={{margin: 8, marginVertical: 8, flexDirection: 'column'}}>
                Weight: {this.state.peso / 10}kg
              </Text>
          </View>
        </View>
      </ScrollView>
    )
  }
}

export default Pokemons;
