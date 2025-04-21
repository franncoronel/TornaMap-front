import { useState } from "react"
import { Box, Tabs, Tab, Typography } from "@mui/material"
import MapSelector from "@/components/common/map/MapSelector"
import ClassRoomCard from "@/components/common/ClassRoomCard"

function CustomTabPanel(props: { children?: React.ReactNode; value: number; index: number }) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

export default function EventTabs({ events }: { events: IEventList[] }) {
  const [tabStates, setTabStates] = useState<{ [eventId: string]: number }>({})

  const handleTabChange = (eventId: string, newValue: number) => {
    setTabStates((prev) => ({
      ...prev,
      [eventId]: newValue,
    }))
  }

  return (
    <>
      {events.map((event) => {
        const activeTab = tabStates[event.id] || 0 // Índice de la pestaña activa para este evento
        return (
          <Box key={event.id} sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              {event.name}
            </Typography>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={activeTab}
                onChange={(e, newValue) => handleTabChange(event.id, newValue)}
                variant="scrollable"
                scrollButtons="auto"
              >
                {event.schedules.map((schedule) => (
                  <Tab
                    key={schedule.id}
                    label={schedule.weekDay || "Sin día"}
                    sx={{ textTransform: "none", fontWeight: "bold" }}
                  />
                ))}
              </Tabs>
            </Box>
            {event.schedules.map((schedule, index) => (
              <CustomTabPanel key={schedule.id} value={activeTab} index={index}>
                {!schedule.isVirtual ? (
                  <>
                    <Typography variant="h6" component="h2">
                      {schedule.classroom?.name} - Piso {schedule.classroom?.floor} -{" "}
                      {schedule.classroom?.building.name}
                    </Typography>
                    <MapSelector
                      building={schedule.classroom?.building.name}
                      level={schedule.classroom?.floor.toString()}
                      classRoom={schedule.classroom?.code}
                    />
                  </>
                ) : (
                  <Box display="flex" flexDirection="column" alignItems="center">
                    <Typography variant="h6" component="h2">
                      Esta clase se dicta de forma virtual
                    </Typography>
                  </Box>
                )}
                <ClassRoomCard schedule={schedule} viewType="modal" />
              </CustomTabPanel>
            ))}
          </Box>
        )
      })}
    </>
  )
}