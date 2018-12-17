import React, { Component } from 'react';
import { Alert } from 'react-native'
import { Container, Header, Content, Form, Item, Input, Label, Textarea, Badge, Text, Button, Picker, Icon, Footer, Left, Right, Card, CardItem } from 'native-base';

class NewRecipe extends Component {
  constructor(props){
    super(props)
    this.state = {
      dietOptions: ['Dairy-free', 'Egg-free', 'Gluten-free', 'Nut-free', 'Soy-free', 'Sugar-free', 'Vegetarian'],
      courseOptions: ['Breakfast', 'Brunch', 'Lunch', 'Dinner', 'Dessert'],
      course: '',
      description: '',
      diet: '',
      dietInputStr: '',
      image_url: '',
      ingredients: [],
      ingredientsStr: '',
      instructions: '',
      recipe_name: '',
      instructionsList: []
    }
  }

  onNameChangeHandler = (e) => {
    this.setState({
      ...this.state,
      recipe_name: e
    })
  }

  onDescChangeHandler = (e) => {
    this.setState({
      ...this.state,
      description: e
    })
  }

  onImgURLChangeHandler = (e) => {
    this.setState({
      ...this.state,
      image_url: e
    })
  }

  onInstChangeHandler = (e) => {
    this.setState({
      ...this.state,
      instructions: e
    })
  }

  addIngredient(){
    const newIngredients = [...this.state.ingredients, this.state.ingredientsStr]
    this.setState({
      ...this.state,
      ingredients: newIngredients,
      ingredientsStr: ''
    })
  }

  onIngChangeHandler = (e) => {
    this.setState({
      ...this.state,
      ingredientsStr: e
    })
  }

  onCourseChange(value: string) {
    this.setState({
      ...this.state,
      course: value
    });
  }
  onDietChange(value: string) {
    const newState = [...this.state.diet, value].filter((v, i, a) => a.indexOf(v) === i)
    this.setState({
      ...this.state,
      diet: newState
    });
  }
  removeIngredient(value){
    const newIngList = this.state.ingredients.filter((ingredient)=>(
      ingredient !== value
    ))
    this.setState({
      ...this.state,
      ingredients: newIngList,
      ingredientsStr: ''
    })
  }

  submit(){
    const { recipe_name, description, ingredients, course, diet, image_url, instructionsList } = this.state
    const newRecipe = { recipe_name, description, ingredients: JSON.stringify(ingredients), course, diet: JSON.stringify(diet), image_url, instructions: JSON.stringify(instructionsList) }
    if (recipe_name === '' || description === '' || ingredients === [] || instructionsList === [] || diet === []) {
      Toast.show({
        text: 'please fill out all required forms',
        buttonText: 'Okay'
      })
      return
    }
    else{
    this.props.newRecipe(newRecipe)
    this.dismiss()
  }
  }

  dismiss(){
    this.setState({
      ...this.state,
      course: '',
      description: '',
      diet: [],
      dietInputStr: '',
      image_url: '',
      ingredients: [],
      ingredientsStr: '',
      instructions: '',
      recipe_name: '',
      instructionsList: []
    })
    this.props.dismiss()
  }

  addInstruction(){
    const newState = [...this.state.instructionsList, this.state.instructions]
    this.setState({
      ...this.state,
      instructionsList: newState,
      instructions: ''
    })
  }

  removeInstruction(value){
    const newInstList = this.state.instructionsList.filter((instructions)=>(
      instructions !== value
    ))
    this.setState({
      ...this.state,
      instructionsList: newInstList,
      instructions: ''
    })
  }

  removeDiet(value){
    const newState = this.state.diet.filter((_diet)=>(
      _diet !== value
    ))
    this.setState({
      ...this.state,
      diet: newState
    })
  }

  moveUp(value){
    const index = this.state.instructionsList.indexOf(value)
    if(index-1 < 0)return
    const toMove = this.state.instructionsList[index]
    const moveHere = this.state.instructionsList[index-1]
    console.log(toMove, moveHere);
    const newState = this.state.instructionsList.map((instruction)=>{
      if(instruction === toMove){
        return moveHere
      }else if(instruction === moveHere){
        return toMove
      }else{
        return instruction
      }
    })
    this.setState({
      ...this.state,
      instructionsList: newState
    })

  }

  moveDown(value){
    const index = this.state.instructionsList.indexOf(value)
    if(index+2 > this.state.instructionsList.length)return
    const toMove = this.state.instructionsList[index]
    const moveHere = this.state.instructionsList[index+1]
    console.log(toMove, moveHere);
    const newState = this.state.instructionsList.map((instruction)=>{
      if(instruction === toMove){
        return moveHere
      }else if(instruction === moveHere){
        return toMove
      }else{
        return instruction
      }
    })
    this.setState({
      ...this.state,
      instructionsList: newState
    })
  }

  render() {
    console.log(this.state.description);
    return (
      <Card style={{flex: 1}}>
        <CardItem floatingLabel>
          <Label>Recipe Name</Label>
          <Input onChangeText={this.onNameChangeHandler}/>
        </CardItem>
        <CardItem floatingLabel>
          <Label>Image URL</Label>
          <Input onChangeText={this.onImgURLChangeHandler}/>
        </CardItem>
        <CardItem floatingLabel>
          <Label>Description</Label>
          <Input onChangeText={this.onDescChangeHandler}/>
        </CardItem>
        <CardItem picker>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="ios-arrow-down-outline" />}
              style={{ width: undefined }}
              placeholder="Select Course"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              selectedValue={this.state.course}
              onValueChange={this.onCourseChange.bind(this)}
            >
              {this.state.courseOptions.map((option, idx)=>(
                <Picker.CardItem label={option} value={option.toLowerCase()} />
              ))}
            </Picker>
          </CardItem>
          <CardItem picker>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="ios-arrow-down-outline" />}
              style={{ width: undefined }}
              placeholder="Select Diet"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              selectedValue={null}
              onValueChange={this.onDietChange.bind(this)}
            >
              {this.state.dietOptions.map((option, idx)=>(
                <Picker.CardItem label={option} value={option.toLowerCase()} />
              ))}
            </Picker>
          </CardItem>
          <CardItem>
          {this.state.diet.length > 0
            ? this.state.diet.map((_diet)=>(
              <Button rounded small success><Text>{_diet}</Text><Icon onPress={() =>this.removeDiet(_diet)} name='close-circle'/></Button>
            ))
            : <Badge warning><Text>No Ingredients</Text></Badge>
          }
          </CardItem>
        <CardItem>
          <Input value={this.state.ingredientsStr} name='ingredientsStr' onChangeText={this.onIngChangeHandler} placeholder='Ingredients'/>
          <Button primary small rounded disabled={this.state.ingredientsStr === '' ? true : false} onPress={()=>this.addIngredient()}>
            <Text>Add Ingredient</Text>
          </Button>
        </CardItem>
        <CardItem>
        {this.state.ingredients.length > 0
          ? this.state.ingredients.map((ingredient)=>(
            <Button rounded small success>
            <Text>{ingredient}</Text>
            <Icon onPress={() =>this.removeIngredient(ingredient)} name='close-circle'/></Button>
          ))
          : <Badge warning><Text>No Ingredients</Text></Badge>
        }
        </CardItem>
        <CardItem>
          <Text>Instructions:</Text>
        </CardItem>
        {this.state.instructionsList.length > 0
          ? this.state.instructionsList.map((instruction, idx)=>(
            <CardItem><Button rounded small success><Icon onPress={()=>this.moveUp(instruction)} name='arrow-up'/><Text>{idx+1}: {instruction}</Text><Icon onPress={() =>this.removeInstruction(instruction)} name='close-circle'/><Icon onPress={()=>this.moveDown(instruction)} name='arrow-down'/></Button></CardItem>
          ))
          : <CardItem><Badge warning><Text>No Instructions</Text></Badge></CardItem>
        }
        <CardItem>
          <Textarea value={this.state.instructions} onChangeText={this.onInstChangeHandler} rowSpan={5} placeholder='Instructions'/>
          <Button primary small rounded disabled={this.state.instructions === '' ? true : false} onPress={()=>this.addInstruction()}>
            <Text>Add Step</Text>
          </Button>
        </CardItem>
        <CardItem>
          <Button onPress={()=>this.submit()} transparent><Text>Submit</Text></Button>
        </CardItem>
        <CardItem>
          <Button onPress={()=>this.dismiss()} transparent><Text>Dismiss</Text></Button>
        </CardItem>
      </Card>
    )
  }
}

export default NewRecipe
