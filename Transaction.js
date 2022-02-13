import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity,TextInput,Image,ImageBackground } from "react-native";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";

const bgImage=require("../Images/background2.png");
const appIcon=require("../Images/appIcon.png");
const appName=require("../Images/appName.png")
export default class TransactionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      domState: "normal",
      hasCameraPermissions: null,
      scanned: false,
      scannedData: "",
      bookId:"",
      studentId:""
    }
  }

  getCameraPermissions = async domState => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);

    this.setState({
      hasCameraPermissions: status === "granted",
      domState: domState,
      scanned: false
    })
  }

  handleBarcodeScanner = async ({ type, data }) => {
    const {domState}=this.state;

    if(domState==="bookId"){
      this.setState({
        bookId: data,
        domState: "normal",
        scanned: true
      })
    }
    else if(domState==="studentId"){
      this.setState({
        studentId: data,
        domState: "normal",
        scanned: true
      })
    }
  }

  render() {
    const { domState, hasCameraPermissions, scanned, scannedData,bookId,studentId } = this.state;
    if (domState !== "normal") {
      return (
        <BarCodeScanner onBarCodeScanned={scanned ? undefined : this.handleBarcodeScanner}
          style={StyleSheet.absoluteFillObject} />
      )
    }

    return (
      <View style={styles.container}>
        <ImageBackground source={bgImage} style={styles.bgImage}>
        <View style={style.upperContainer}>
            <Image source={appIcon} style={styles.appIcon}/>
            <Image source={appName} style={styles.appName}/>
        </View>
        <View style={styles.lowerContainer}>
          <View style={styles.TextinputContainer}>
          <TextInput 
            style={styles.textinput}
            placeholder={"book Id"}
            placeholderTextColor={"white"}
            value={bookId}
            />
            <TouchableOpacity 
              style={styles.scanbutton}
              onPress={()=>this.getCameraPermissions("bookId")}>
                <Text style={styles.scanbuttonText}>Scan </Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.TextinputContainer,{marginTop:25}]}>
          <TextInput 
            style={styles.textinput}
            placeholder={"student Id"}
            placeholderTextColor={"white"}
            value={studentId}
            />
            <TouchableOpacity 
              style={styles.scanbutton}
              onPress={()=>this.getCameraPermissions("studentId")}>
                <Text style={styles.scanbuttonText}>Scan </Text>
            </TouchableOpacity>
          </View>
        </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5653D4"
  },
  text: {
    color: "#ffff",
    fontSize: 30
  },
  button: {
    width: "43%",
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F48D20",
    borderRadius: 15
  },
  buttonText: {
    fontSize: 24,
    color: "white"
  },
  bgImage:{
    flex:1,
    resizeMode:"cover",
    justifyContent:"center"
  },
  upperContainer:{
    flex:0.5,
    justifyContent:"center",
    alignItems:"center"
  },
  appIcon:{
    width:200,
    height:200,
    marginTop:80,
    resizeMode:"contain"
  },
  appName:{
    width:80,
    height:80,
    resizeMode:"contain"
  },
  lowerContainer:{
    flex:0.5,
    alignItems:"center"
  },
  TextinputContainer:{
    borderWidth:2,
    borderRadius:10,
    flexDirection:"row",
    backgroundColor:"#9DFD24",
    borderColor:"white"
  },
  textinput:{
    width:"57%",
    height:50,
    padding:10,
    borderColor:"white",
    borderRadius:10,
    borderWidth:3,
    fontSize:18,
    backgroundColor:"#5653D4",
    fontFamily:"Rajdhani_600SemiBold",
    color:"white"
  },
  scanbutton:{
    width:100,
    height:50,
    backgroundColor:"#9DFD24",
    borderTopRightRadius:10,
    borderBottomRightRadius:10,
    justifyContent:"center",
    alignItems:"center"
  },
  scanbuttonText:{
    fontSize:24,
    color:"#0A0101",
    fontFamily:"Rajdhani_600SemiBold"
  }
});
