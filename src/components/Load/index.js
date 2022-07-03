import { CircularProgress, Modal } from '@mui/material';
import styled from 'styled-components';

const Loading = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Load = ({ load }) => {
  return (
    <Loading
    open={load}
    >
      <CircularProgress size={80} />
    </Loading>
  )
};

export default Load;
