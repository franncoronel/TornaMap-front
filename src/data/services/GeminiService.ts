const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${GEMINI_API_KEY}`

export interface AssignmentSuggestion {
  courseName: string
  classroomCode: string
  classroomName: string
  capacity: number
  students: number
  justification: string
}

export const geminiService = {
  async suggestDistribution(
    periodTitle: string,
    courses: { name: string; students: number }[],
    classrooms: { code: string; name: string; capacity: number; type: string }[]
  ): Promise<AssignmentSuggestion[]> {
    const prompt = `
Eres un asistente académico que ayuda a distribuir materias en aulas universitarias.

Período: ${periodTitle}

Materias a asignar (con cantidad de alumnos inscriptos):
${courses.map(c => `- ${c.name}: ${c.students} alumnos`).join('\n')}

Aulas disponibles (con capacidad):
${classrooms.map(c => `- [${c.code}] ${c.name}: capacidad ${c.capacity} personas, tipo: ${c.type}`).join('\n')}

Tu tarea es sugerir la mejor asignación de aulas para cada materia, priorizando:
1. Que la capacidad del aula sea suficiente para los alumnos inscriptos
2. Que no se desperdicie capacidad innecesariamente
3. Preferir aulas de tipo CLASSROOM para cursadas regulares

Respondé ÚNICAMENTE con un array JSON válido, sin texto adicional, sin bloques de código markdown, sin explicaciones fuera del JSON. Formato exacto:
[
  {
    "courseName": "nombre de la materia",
    "classroomCode": "código del aula",
    "classroomName": "nombre del aula",
    "capacity": 70,
    "students": 45,
    "justification": "breve explicación"
  }
]
`
    const response = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.2 }
      })
    })

    if (!response.ok) throw new Error('Error al contactar Gemini')

    const data = await response.json()
    const text = data.candidates[0].content.parts[0].text
    const clean = text.replace(/```json|```/g, '').trim()
    return JSON.parse(clean) as AssignmentSuggestion[]
  }
}