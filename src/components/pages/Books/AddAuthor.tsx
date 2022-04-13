import Box from "@mui/material/Box";
import { useState } from "react";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import { AuthorFormInput } from "./interfaces";
import TextField from "@mui/material/TextField";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { BooksService } from "../../../services/books.service";

interface propsAddAuthor {
  handleClose: () => void;
}

const useStyles = makeStyles({
  root: {
    border: 0,
    borderRadius: 3,
    height: 48,
    margin: "0 auto",
  },
});

export const AddAuthor = ({ handleClose }: propsAddAuthor) => {
    const [errors, setErrors] = useState<null | string>(null);
  const { control, handleSubmit } = useForm<AuthorFormInput>();
  const onSubmit: SubmitHandler<AuthorFormInput> = (data) => {
    BooksService.addAuthor(
      data.name,
      data.nationality
    ).then((response)=>{
        setErrors(null)
        console.log(response)
    })
    .catch(error =>{
        if(error.response){
            console.log(error.response)
            setErrors('Algo salio mal');
        }
    })
  };
  const classes = useStyles();
  return (
    <Box
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
        position: "absolute" as "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: true, maxLength: 50 }}
            render={({ field }) => (
              <TextField
                label="Nombre"
                variant="standard"
                autoComplete="off"
                {...field}
              />
            )}
          />
          <Controller
            name="nationality"
            control={control}
            defaultValue=""
            rules={{ required: true, maxLength: 50 }}
            render={({ field }) => (
              <TextField
                label="Nacionalidad"
                variant="standard"
                autoComplete="off"
                {...field}
              />
            )}
          />
        </div>
        { errors}
        <Button className={classes.root} type="submit">
          Añadir
        </Button>
        <Button className={classes.root} onClick={handleClose}>
          Cerrar
        </Button>
      </form>
    </Box>
  );
};
