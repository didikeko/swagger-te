import React, { Fragment } from 'react'
import Header from './components/Header'
import Iframe from './components/Iframe'
import './App.css'
import AceEditor from 'react-ace'
import axios from 'axios'

import 'brace/mode/javascript'
import 'brace/theme/monokai'
import 'brace/theme/merbivore'
import 'brace/theme/vibrant_ink'

export default class App extends React.Component {
    constructor(props, context) {
        super(props);
        this.state = {
            src: 'http://localhost:5000/api-docs/#/',
            value_editor: null,
            codes: null,
            value_editor_changed: [],
            random: 0
        };
        
        this.onChange = this.onChange.bind(this);
    }

    onChange = (newValue) => {
        this.state.codes= newValue;
        // console.log('change', this.state.value_editor);
    }

    updateEditor = () => {
        this.state.value_editor_changed=this.state.codes.split('\n').filter(Boolean);
        fetch('http://localhost:4000/append',{
            method: 'POST',
            body: JSON.stringify(this.state.value_editor_changed),
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(json => 
            console.log('Success:', json)
          )
        .catch(error => console.log('error', error));
    }

    // updateCodesEditor = async (newValue) => {
    //     try {
    //         const response = await fetch(`http://localhost:4000/update`,{
    //             method: 'PUT',
    //             body: JSON.stringify(this.state.codes.split('\n').filter(Boolean)),
    //             mode: 'cors',
    //             headers: {
    //                 'Access-Control-Allow-Origin': '*',
    //                 'Content-Type': 'application/json'
    //             }
    //         })
    //         const json = await response.json();
    //         if(json.code === 200){
    //             console.log(json.code);
    //             this.reload(newValue);
    //         }
            
    //       } catch (error) {
    //         console.log(error);
    //       }
    // }

    reload(newValue=1){
        this.state.random = this.state.random + newValue;
        console.log(this.state.random);
        this.forceUpdate();
        
    }
    save = (newValue) => {

        if(this.state.codes != null){
            this.updateEditor();
            setTimeout(
                () => this.reload(newValue), 
                1000
              );  

        }
        // this.updateCodesEditor(newValue);

    }

    componentDidMount(){
        fetch('http://localhost:4000/readfile',{
            method: 'GET',
            mode: 'cors',
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json'
            }
        })
        .then(response => response.json()) 
        .then(json => 
            this.setState({ codes: json.data.join('\n') }))
        .catch(error => console.log('error', error));
    }
    coba = () =>{

        if(this.state.value_editor != null){
            this.state.value_editor_changed=this.state.value_editor.split('\n').filter(Boolean)
            console.log(this.state.value_editor_changed);
        }

    }


    render() {
        return (
        <Fragment>
          <Header onValueChange={(value) => this.save(value)}/>
          <div id="container">
            <div id="editor">
                <AceEditor
                        mode="javascript"
                        theme="vibrant_ink"
                        onChange={this.onChange}
                        value={this.state.codes}
                        width="100%"
                        height="1000px"
                        name="UNIQUE_ID_OF_DIV"
                        fontSize="12pt"
                        showPrintMargin={false}
                        editorProps={{
                            $blockScrolling: true
                        }}
                    />
             </div>
             <div id="iframe">
                <Iframe clue={this.state.random} source={this.state.src}/>
            </div>
        </div>

        </Fragment>

        );
    }
}