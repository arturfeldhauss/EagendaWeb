import { IRepositorioSerializavel } from "../shared/repositorio-serializavel.interface";
import { IRepositorio } from "../shared/repositorio.interface";
import { Tarefa } from "./tarefa.model";

export class TarefaRepositoryLocalStorage implements IRepositorio<Tarefa>, IRepositorioSerializavel{
  private readonly localStorage:Storage;

  private readonly tarefas: Tarefa[];

  
  constructor(){
    this.localStorage = window.localStorage;

    this.tarefas = this.selecionarTodos();
  }
  public gravar(): void {
    const tarefasJsonString = JSON.stringify(this.tarefas);

    this.localStorage.setItem("tarefas",tarefasJsonString);
  }
  
  public inserir(registro: Tarefa): void {
    this.tarefas.push(registro);
    this.gravar();
  }
  public selecionarTodos(): Tarefa[] {
    const dados = this.localStorage.getItem("tarefas");
    if(!dados)
      return[];

    return JSON.parse(dados);

  }

}