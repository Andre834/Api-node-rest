import * as admin from "firebase-admin";

import express, { Request, Response } from "express";

// Intancia (express)
const app = express();

// Start firebase
var serviceAccount = require("./api-filme-firebase-adminsdk-y4pqk-8a9e29c3bf.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Intancia (firebase)
const db = admin.firestore();

app.use(express.json());

// Routes and Methods(Filmes: id, nome, tema, ano, duração)
app.get("/filmes", async (req: Request, res: Response) => {
  const filmesRef = db.collection("filmes");

  const filmesDoc = await filmesRef.get();
  const filmes: any[] = [];

  filmesDoc.forEach((doc) => filmes.push(doc.data()));

  return res.status(200).json([filmes]);
});

// Method post create all the content
app.post("/filmes", (req: Request, res: Response) => {
  // Add a new document with a generated id.
  db.collection("filmes")
    .add({
      name: "Tokyo",
      ano: 2021,
      tema: "show House",
      duracao: 160,
    })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });

  const { id, nome, tema, ano, duracao } = req.body;
  return res.status(201).json({ id, nome, tema, ano, duracao });
});

// Methods get  by id the content
app.get("/filmes/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  return res.json({ id, nome: "Vinkings", ano: 2017, duracao: 234 });
});

// Methods put create by id the content
app.put("/filmes/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  return res.json({ id, nome: "Logoa azul", ano: 2018, duracao: 234 });
});

// Method post update by id the content
app.post("/filmes/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  return res.json({ id, nome: "O vampiro", ano: 2017, duracao: 234 });
});

// Method delete  by id the content
app.delete("/filmes/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  return res.status(204).send();
});

// Porta
app.listen(3000, () => {
  console.log("Servidor rodando..");
});
