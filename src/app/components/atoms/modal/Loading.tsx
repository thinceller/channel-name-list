import { CircularProgress, Modal } from '@material-ui/core';
import { styled } from '@material-ui/styles';

const Loading: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  return (
    isLoading ? (
      <Modal open={true}>
        <MyProgress id="Loading" style={{ userSelect: 'none' }} />
      </Modal>
    ) : null
  );
};

const MyProgress = styled(CircularProgress)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  margin: 'auto',
});

export default Loading;
