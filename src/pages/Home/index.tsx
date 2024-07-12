import { Play } from 'phosphor-react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as zod from 'zod';
import {differenceInSeconds} from 'date-fns';
import {
  ConuntdownContainer,
  FormContainer,
  HomeContainer,
  Separator,
  Button,
  ButtonContainer,
  TaskInput,
  MinutesAmountInput,
} from './styles';
import { useEffect, useState } from 'react';


const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(2, 'Informe a tarefa'),
  minutesAmount: zod.number().min(5).max(120),
})

//substitui a interface
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

//para definir o formato de cada ciclo que for adicionado
interface Cycle{
  id: string,
  task: string,
  minutesAmount: number,
  startDate: Date,
  // isActive: boolean,

}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  const {register, handleSubmit, watch, reset} = useForm({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues:{
      task: '',
      minutesAmount: 0,
    }
  });

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  useEffect(() => {
    let interval: number
    if (activeCycle) {
      interval = setInterval(() => {
        setAmountSecondsPassed(
          differenceInSeconds(new Date(), activeCycle.startDate),
        )
      }, 1000)
    }
    return () => {
      clearInterval(interval)
    }
  }, [activeCycle])

  function handleCreateNewCycle(data: NewCycleFormData,) {
    const id = String(new Date().getTime())
      const newCycle: Cycle={
          id,
          task: data.task,
          minutesAmount: data.minutesAmount,
          startDate: new Date(),
      }
      //Adicionar o novo ciclo a listagem
      //Para adicionar a nova informacao, copiar todos os ciclos que ja tenho e adiciona-lo no final
      //toda vez que altero um estaado, e esse estado depende de sua versao anterior e bom o valor 
      //ser setado no formato de funcao -> closures
      setCycles((state)=>[...state, newCycle])
      setActiveCycleId(id)
      setAmountSecondsPassed(0)

      reset();
  }

const totalSeconds= activeCycle ? activeCycle.minutesAmount * 60 : 0
const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0
const minutesAmount = Math.floor(currentSeconds / 60)
const secondsAmount = currentSeconds % 60

const minutes = String(minutesAmount).padStart(2, '0')
const seconds = String(secondsAmount).padStart(2, '0')

useEffect(() => {
  if (activeCycle) {
    document.title = `${minutes}:${seconds}`
  }
}, [minutes, seconds, activeCycle])


const task = watch ('task')

const isSubmitDisabled=!task
  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput id="task"  list="task-sugestions" placeholder="De um nome para o seu projeto" {...register('task')}/>
          <datalist id="task-sugestions">
            <option>Projeto 1</option>
            <option>Projeto 2</option>
            <option>Projeto 3</option>
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput type="number" id="minutesAmount" placeholder="00" step={5} min={5} max={120}  {...register('minutesAmount', {valueAsNumber:true})}/>


          <span>minutos.</span>
        </FormContainer>

        <ConuntdownContainer>
        <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </ConuntdownContainer>
        <ButtonContainer>
        <Button disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
          Começar
        </Button>
        </ButtonContainer>
      </form>
    </HomeContainer>
  )
}
