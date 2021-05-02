import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
  Button,
  IconButton,
} from "@material-ui/core";

function ModalBox(props) {
  const { maxReachedModal, setMaxReachedModal } = useContext(UserContext);
  return (
    <Dialog
      onClose={() => setMaxReachedModal(false)}
      aria-labelledby="dialog-title"
      open={maxReachedModal}
    >
      <DialogTitle id="dialog-title">Maximum nominees</DialogTitle>
      <DialogContent>
        <Typography>
          You have added 5 nominees. You can not add any more.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setMaxReachedModal(false)}>Got it!</Button>
        <IconButton></IconButton>
      </DialogActions>
    </Dialog>
  );
}

export default ModalBox;
