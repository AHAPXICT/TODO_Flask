import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const TodoModal = (props) => {
    const changeInputTitle = (event) => {
        props.update_title_input(event.target.value);
    };

    const changeInputBody = (event) => {
        props.update_body_input(event.target.value);
    };

    const clearInputFields = () => {
        props.update_title_input('');
        props.update_body_input('');
    };

    const addAndClose = (title, body) => {
        props.addTodo({ title: title, body: body });
        clearInputFields();
        props.handleClose();
    };

    return (
        <div>
            <Dialog
                open={props.show}
                onClose={props.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Todo</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To create todo, please enter todo title and body
                        (optional).
                    </DialogContentText>
                    <TextField
                        autoFocus={true}
                        margin="dense"
                        label="Title"
                        type="text"
                        fullWidth
                        value={props.input_fields.title}
                        onChange={changeInputTitle}
                    />
                    <TextField
                        margin="dense"
                        label="Body"
                        type="text"
                        fullWidth
                        value={props.input_fields.body}
                        onChange={changeInputBody}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={() =>
                            addAndClose(
                                props.input_fields.title,
                                props.input_fields.body
                            )
                        }
                        color="primary"
                        disabled={!Boolean(props.input_fields.title)}
                    >
                        Add
                    </Button>
                    <Button
                        onClick={clearInputFields}
                        disabled={
                            !Boolean(props.input_fields.title) &&
                            !Boolean(props.input_fields.body)
                        }
                        color="primary"
                    >
                        Clear
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default TodoModal;
