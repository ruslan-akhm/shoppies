import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";

import {
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
  Button,
  IconButton,
  Slide,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles(theme => ({
  actions: {
    display: "flex",
    justifyContent: "center",
  },
  closeButton: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
  content: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(5),
  },
  dialog: {
    padding: theme.spacing(1),
    position: "relative",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ModalBox(props) {
  const classes = useStyles();
  const { maxReachedModal, setMaxReachedModal } = useContext(UserContext);
  return (
    <Dialog
      onClose={() => setMaxReachedModal(false)}
      aria-labelledby="dialog-title"
      open={maxReachedModal}
      className={classes.dialog}
      TransitionComponent={Transition}
    >
      <DialogTitle id="dialog-title">
        Maximum nominees
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={() => setMaxReachedModal(false)}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.content}>
        <Typography>
          You have added 5 nominees. You can not add any more.
        </Typography>
      </DialogContent>
      <DialogActions className={classes.actions}>
        <Button
          onClick={() => setMaxReachedModal(false)}
          variant="outlined"
          color="primary"
        >
          Got it!
        </Button>
        <IconButton></IconButton>
      </DialogActions>
    </Dialog>
  );
}

export default ModalBox;
