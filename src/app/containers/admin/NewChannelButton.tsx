import * as React from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Dialog,
  DialogTitle,
  FormControl,
  InputLabel,
  DialogContent,
  DialogActions,
} from '@material-ui/core';

import { channelModule } from '../../modules';
import { Channel } from '../../models';
import { ModalButton, ModalInput } from '../../components';

interface NewChannelButtonProps {
  createNewChannel: (id: string) => Promise<Channel>;
}

class NewChannelButton extends React.Component<NewChannelButtonProps> {
  static mapDispatchToProps = (dispatch: any) => ({
    createNewChannel: (id: string) => dispatch(channelModule.createNewChannel(id)),
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
          style={{ marginBottom: 20 }}
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
              <ModalInput value={inputText} onChange={this.handleInputChange} />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <ModalButton
              onClick={this.toggleModal}
            >
              キャンセル
            </ModalButton>
            <ModalButton
              variant="contained"
              color="primary"
              onClick={this.handleFormSubmit}
            >
              作成
            </ModalButton>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default connect(
  null,
  NewChannelButton.mapDispatchToProps,
)(NewChannelButton);
