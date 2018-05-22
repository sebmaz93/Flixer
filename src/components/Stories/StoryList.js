import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "react-modal";

import Story from "./Story";
import StoryView from "./StoryView";
import "./StoryList.css";
import customStyles from "./ModalStyle";

class StoryList extends Component {
  state = {
    showModal: false,
    selectedStory: null
  };

  viewStory = selectedStory => {
    this.setState({ selectedStory });
    this.setState({ showModal: true });
  };

  componentWillMount(){
    console.log(this.props.stories)
  }

  render() {
    return (
      <div styleName="panel">
        <ul styleName="list">
          {this.props.stories.map(story => (
            <Story viewStory={this.viewStory} story={story} key={story.id} />
          ))}
        </ul>
        <Modal
          isOpen={this.state.showModal}
          contentLabel="Story"
          shouldCloseOnOverlayClick={false}
          shouldCloseOnEsc={true}
          ariaHideApp={false}
          style={customStyles}
        >
          <StoryView
            closeModal={() => this.setState({ showModal: false })}
            stories={this.state.selectedStory}
            history={this.props.history}
          />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  stories: state.home.stories
});

export default connect(mapStateToProps)(StoryList);
