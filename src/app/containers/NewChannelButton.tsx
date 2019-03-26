import * as React from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Dialog,
  DialogTitle,
  Input,
  FormControl,
  InputLabel,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import { styled } from '@material-ui/styles';

import { channelModule } from '../modules';
import { Channel } from '../models';

interface NewChannelButtonProps {
  createNewChannel: (id: string) => Promise<Channel>;
}

class NewChannelButton extends React.Component<NewChannelButtonProps> {
  static mapDispatchToProps = (dispatch: any) => ({
    createNewChannel: () => dispatch(channelModule.createNewChannel),
  })

  state = {
    isModalOpen: false,
    inputText: '',
  };

  toggleModal = () => this.setState({ isModalOpen: !this.state.isModalOpen });

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputText: e.currentTarget.value });
  }

  handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { inputText } = this.state;
    this.props.createNewChannel(inputText)
      .then(() => {
        this.setState({
          isModalOpen: !this.state.isModalOpen,
          inputText: '',
        });
      });
  }

  render() {
    const { inputText, isModalOpen } = this.state;

    return (
      <>
        <Button
          variant="contained"
          color="primary"
          onClick={this.toggleModal}
        >
          新規チャンネル追加
        </Button>
        <Dialog
          open={isModalOpen}
          onClose={this.toggleModal}
        >
          <DialogTitle>新規チャンネル追加</DialogTitle>
          <DialogContent>
            <FormControl>
              <InputLabel>チャンネルID</InputLabel>
              <MyInput value={inputText} onChange={this.handleInputChange} />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <MyButton
              onClick={this.toggleModal}
            >
              キャンセル
            </MyButton>
            <MyButton
              color="primary"
              onClick={this.handleFormSubmit}
            >
              作成
            </MyButton>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

const MyInput = styled(Input)({
  marginBottom: 30,
});

const MyButton = styled(Button)({
  width: 100,
  margin: 'auto',
});

export default connect(
  null,
  NewChannelButton.mapDispatchToProps,
)(NewChannelButton);
