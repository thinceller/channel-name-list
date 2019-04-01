import { CircularProgress, Modal } from '@material-ui/core';
import { styled } from '@material-ui/styles';

const Loading: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  return (
    isLoading ? (
      <Modal open={true}>
        <MyProgress className="Loading" />
      </Modal>
    ) : null
  );
};

const MyProgress = styled(CircularProgress)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  // transform: 'translate(-50%, -50%)',
  margin: 'auto',
});

export default Loading;
