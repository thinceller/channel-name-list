import * as React from 'react';
import { connect } from 'react-redux';
import * as Autosuggest from 'react-autosuggest';

import { State, channelModule, channelListModule } from '../../modules';
import { Channel } from '../../models';

interface ChannelSuggestion {
  name: string;
  id: string;
}

const LanguageAutosuggest = Autosuggest as { new (): Autosuggest<ChannelSuggestion> };

interface ChannelSuggestProps {
  channels: Channel[];
  channelList: string[];
  suggestingChannel: string;
  getAllChannels: () => Promise<Channel[]>;
  handleSuggestingChange: (liverName: string) => Promise<void>;
}

interface ChannelSuggestState {
  suggestions: ChannelSuggestion[];
}

class ChannelSuggest extends React.Component<ChannelSuggestProps, ChannelSuggestState> {
  static mapStateToProps = (state: State) => ({
    channels: state.channel.channels,
    channelList: state.channelList.channelList || [],
    suggestingChannel: state.channelList.suggestingChannel,
  })

  static mapDispatchToProps = (dispatch: any) => ({
    getAllChannels: () => dispatch(channelModule.getAllChannels()),
    handleSuggestingChange: (liverName: string) => {
      return dispatch(channelListModule.handleSuggestingChange(liverName));
    },
  })

  state = {
    suggestions: [],
  };

  componentDidMount() {
    this.props.getAllChannels();
  }

  componentWillUnmount() {
    this.props.handleSuggestingChange('');
  }

  getSuggestions = (value: string): ChannelSuggestion[] => {
    const inputLength = value.length;
    const candidateChannels = this.props.channels.filter(channel => {
      // すでにリストに含まれていないものだけサジェストする
      return !this.props.channelList.includes(channel.id);
    });

    const filteredChannels = inputLength === 0 ? [] : candidateChannels.filter(channel => {
      return channel.liverName.match(value) || channel.liverPhonetic.match(value);
    });

    return filteredChannels.map(channel => {
      return { name: channel.liverName, id: channel.id };
    });
  }

  getSuggestionValue = (suggestion: ChannelSuggestion) => suggestion.name;

  renderSuggestion = (suggestion: ChannelSuggestion) => (
    <div>
      {suggestion.name}
    </div>
  )

  onChange = (e: React.FormEvent<any>, { newValue }) => {
    e.preventDefault();
    this.props.handleSuggestingChange(newValue);
  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({ suggestions: this.getSuggestions(value) });
  }

  onSuggestionsClearRequested = () => {
    this.setState({ suggestions: [] });
  }

  render() {
    const { suggestions } = this.state;

    const inputProps = {
      value: this.props.suggestingChannel,
      placeholder: 'リストに追加したいライバーの名前を入力してください。',
      onChange: this.onChange,
    };

    return (
      <LanguageAutosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}

export default connect(
  ChannelSuggest.mapStateToProps,
  ChannelSuggest.mapDispatchToProps,
)(ChannelSuggest);
