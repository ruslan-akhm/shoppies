import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

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
  Hidden,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles(theme => ({
  actions: {
    display: "flex",
    justifyContent: "space-evenly",
    paddingBottom: theme.spacing(4),
  },

  content: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(5),
  },
  dialog: {
    padding: "0 !important",
    "& .MuiDialog-paper": {
      margin: "0",
    },
    "& .MuiDialog-scrollPaper": {
      alignItems: "flex-end",

      padding: "0",
    },
    "& .MuiDialog-paperWidthSm": {
      maxWidth: "100%",
      width: "100%",
    },
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ModalBox(props) {
  const classes = useStyles();
  const { maxReachedModal, setMaxReachedModal, setInView } = useContext(
    UserContext
  );

  return (
    <Dialog
      onClose={() => setMaxReachedModal(false)}
      aria-labelledby="dialog-title"
      open={maxReachedModal}
      className={classes.dialog}
      TransitionComponent={Transition}
    >
      <DialogTitle id="dialog-title" className={classes.title}>
        Maximum nominees
      </DialogTitle>
      <DialogContent className={classes.content}>
        <Typography>
          You have added 5 nominees. You can not add any more.
        </Typography>
      </DialogContent>
      <DialogActions className={classes.actions}>
        <Hidden mdUp>
          <Button
            onClick={() => {
              setMaxReachedModal(false);
              setInView("NominatedBox");
            }}
            variant="contained"
            color="primary"
          >
            See Nominees
          </Button>
        </Hidden>
        <Button
          onClick={() => setMaxReachedModal(false)}
          variant="outlined"
          color="primary"
        >
          Got it!
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ModalBox;
