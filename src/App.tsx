import React, { useState } from "react";
import "./App.css";
import Modal from "./components/modal";

function App() {
  const [state, setState] = useState<{
    name: string;
    address: string;
    mail: string;
    old?: number;
    tel?: string;
    open?: boolean;
    success?: string;
  }>({
    name: "Josh",
    mail: "example@example.com",
    address: "address",
    old: 20,
    tel: "08042851990",
  });
  const [error, setError] = useState<{
    name: string;
    old: string;
    tel: string;
    mail: string;
    address: string;
  }>({
    name: "",
    old: ``,
    tel: ``,
    mail: "",
    address: "",
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { value, name } = event.target;
    switch (name) {
      case `name`:
        if (value.length === 0) {
          setError({ ...error, name: `is empty` });
        } else if (value.length > 20) {
          setError({ ...error, name: `over` });
        } else if (/^\s+$/.test(value)) {
          setError({ ...error, name: `space` });
        } else {
          setError({ ...error, name: `` });
        }

        break;
      case `old`:
        if (parseInt(value) < 18) {
          setError({ ...error, old: "too young" });
        } else {
          setError({ ...error, old: `` });
        }
        break;
      default:
        break;
    }
    setState({ ...state, [name]: value });
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (state.success) {
      setState({
        address: "",
        mail: "",
        name: "",
        old: undefined,
        open: false,
        success: undefined,
        tel: "",
      });
      return
    }
    let err: string[] = [];
    for (let v of Object.keys(error)) {
      if ((error as any)[v].length) {
        err.push((error as any)[v]);
      }
    }
    setState({ ...state, open: true });
    // const res= fetch("").then(()=>{
    //   alert('success!')
    // }).catch((err)=>{
    //   if(err.status===400){
    //     alert('bad request')
    //   }else if(err.message){
    //     alert(err.message)
    //   }
    // })
  };
  return (
    <div>
      <div
        style={{
          position: "absolute",
        }}
      >
        <Modal
          open={state.open}
          data={state}
          handleCancel={(e) => {
            setState({ ...state, open: false });
          }}
          handleSubmit={async (e) => {
            const res = await fetch("http://localhost:8000/api/post", {
              method: "POST",
              body: JSON.stringify(state),
              headers: {
                "Content-Type": "application/json",
              },
            });
            const { error, message, data } = await res.json();
            if (error) {
              alert(message);
              return;
            }
            setState({ ...state, success: "Success!", open: false });
          }}
        />
      </div>
      <form onSubmit={handleSubmit}>
        {state.success ? (
          <span>{state.success}</span>
        ) : (
          <>
            <label>
              Name:
              <input
                name="name"
                value={state.name}
                type="text"
                onChange={handleChange}
              />
              {error.name && <span style={{ color: `red` }}>{error.name}</span>}
            </label>
            <br />
            <label>
              old:
              <input
                name="old"
                value={state.old || ``}
                type="number"
                onChange={handleChange}
              />
              {error.old && <span style={{ color: "red" }}>{error.old}</span>}
            </label>
            <br />
            <label>
              tel:
              <input
                name="tel"
                value={state.tel || ``}
                type="number"
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Email:
              <input
                name="mail"
                value={state.mail}
                type="mail"
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Address:
              <input
                name="address"
                value={state.address}
                type="text"
                onChange={handleChange}
              />
            </label>
          </>
        )}
        <br />
        <input type="submit" value={state.success ? "re-typing" : "Submit"} />
      </form>
    </div>
  );
}

export default App;
