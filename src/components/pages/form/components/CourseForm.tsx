import { ICourse } from "@/data/domain/Course"
import { Box } from "@mui/material"
import { useEffect } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useOutletContext, useParams } from "react-router-dom"
import { FormContext } from "../Form"

export default function CourseForm() {
    const { mode, setTitle } = useOutletContext<FormContext>()
    const { id } = useParams()
    const {
        control,
        handleSubmit,
        formState: { errors }
      } = useForm<ICourse>({
        
      })
    const onSubmit: SubmitHandler<ICourse> = async (data) => {

    }

    useEffect(() => {
        setTitle('Asignatura')
    }, [setTitle])

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
        >
        </Box>
    )
}
