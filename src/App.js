import React, { Component } from "react";
import TranscriptEditor from "@bbc/react-transcript-editor";
import transcriptData from "./test.json";
import "./styles.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transcriptData: null,
      // mediaUrl: "https://stacks.stanford.edu/file/druid:bc234gm4243/bc234gm4243_sl.mp4",
      mediaUrl: null,
      isTextEditable: true,
      spellCheck: false,
      sttJsonType: "autoedit2",
      title: "",
      autoSaveData: {},
      // autoSaveContentType: "draftjs",
      autoSaveExtension: "json",
      purlUrl: "https://purl.stanford.edu/bc234gm4243"
    };
    this.updatePurl = this.updatePurl.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.purlUrl !== prevState.purlUrl) {
      console.log("do it");
    }
  }

  updatePurl(event) {
    this.setState({
      purlUrl: event.target.value
    });
  }

  formSubmit(event) {
    event.preventDefault();
    fetch(`${this.state.purlUrl}/iiif3/manifest`)
      .then(response => response.json())
      .then(data => {
        const mediaUrl = data.items[0].content[0].items[0].body.id;
        this.setState({
          mediaUrl
        });
      });
  }

  render() {
    return (
      <div className="App">
        <div>
          <form onSubmit={this.formSubmit}>
            <label>
              Enter your purl:
              <input value={this.state.purlUrl} onChange={this.updatePurl} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
        <TranscriptEditor
          transcriptData={this.state.transcriptData}
          fileName={this.state.fileName}
          mediaUrl={this.state.mediaUrl}
          isEditable={this.state.isTextEditable}
          spellCheck={this.state.spellCheck}
          sttJsonType={this.state.sttType}
          title={this.state.title}
          ref={this.transcriptEditorRef}
          handleAutoSaveChanges={this.handleAutoSaveChanges}
          mediaType={"video"}
        />
      </div>
    );
  }
}
