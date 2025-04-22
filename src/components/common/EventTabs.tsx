import { useState } from "react"
import { Box, Tabs, Tab, Typography } from '@mui/material'
import { MapSelector } from '@/components/common/map/MapSelector'
import ClassRoomCard from '@/components/common/ClassRoomCard'
import { ISchedule } from '@/data/domain/Schedule'
import { IEvent } from '@/data/domain/Event'
import { Laptop } from '@phosphor-icons/react'
import '../pages/search/search.css'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function CustomTabPanel(props: TabPanelProps) {
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

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

export default function EventTabs({ events }: { events: IEvent[] }) {
  const [tabStates, setTabStates] = useState<{ [eventId: string]: number }>({})

  const handleTabChange = (eventId: string, newValue: number) => {
    setTabStates((prev) => ({
      ...prev,
      [eventId]: newValue,
    }))
  }

  const createLabel = (schedule : ISchedule) => {
    if (!schedule.weekDay && !schedule.date) {
      return "Sin fecha"
    }
    if (schedule.weekDay) {
      return schedule.weekDay
    }
    return buildDateString(schedule)
  }

  const buildDateString = (schedule: ISchedule) => {
    const date = new Date(schedule.date!!)
  
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    
    return `${day}/${month}`
  }

  return (
    <>
      {events.map((event) => {
        const activeTab = tabStates[event.id] || 0 // Índice de la pestaña activa para este evento
        return (
          <Box key={event.id} sx={{ mb: 4 }}>
            <Typography
              variant="h6"
              sx={{
                  textAlign: "center",
                  fontWeight: "bold"
                }}
            >
              {event.name}
            </Typography>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={activeTab}
                onChange={(e, newValue) => handleTabChange(event.id, newValue)}
                variant="fullWidth"
              >
                {event.schedules.map((schedule: ISchedule) => (
                  <Tab
                    key={schedule.id}
                    label={ createLabel(schedule) }
                    sx={{
                      textTransform: "none",
                      fontWeight: "bold"
                    }}
                  />
                ))}
              </Tabs>
            </Box>
            {event.schedules.map((schedule: ISchedule, index) => (
              <CustomTabPanel
                key={schedule.id}
                value={activeTab}
                index={index}
              >
                <section className="schedules-list-container">
                  <div
                    className={`schedules-list ${event.schedules.length == 1 ? 'single' : ''}`}
                  >
                    {!schedule.isVirtual ? (
                      <article className="schedules-list-item">
                        <Typography
                          id="modal-modal-title"
                          variant="h6"
                          component="h2"
                          sx={{
                            textAlign: 'center',
                            wordBreak: 'break-word',
                            whiteSpace: 'normal'
                          }}
                        >
                          {schedule.classroom?.name} / Piso{' '}
                          {schedule.classroom?.floor} /{' '}
                          {schedule.classroom?.building.name}
                        </Typography>
                        <MapSelector
                          building={schedule.classroom?.building.name}
                          level={schedule.classroom?.floor.toString()}
                          classRoom={schedule.classroom?.code}
                        />
                      </article>
                    ) : (
                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                      >
                        <Typography
                          id="modal-modal-title"
                          variant="h6"
                          component="h2"
                          sx={{
                            textAlign: 'center',
                            wordBreak: 'break-word',
                            whiteSpace: 'normal'
                          }}
                        >
                          Esta clase se dicta de forma virtual
                        </Typography>
                        <Laptop
                          size={150}
                          color="#2e4b7d"
                          weight="duotone"
                        />
                      </Box>
                    )}
                    <ClassRoomCard
                      schedule={schedule}
                      viewType="modal"
                    />
                  </div>
                </section>
              </CustomTabPanel>
            ))}
          </Box>
        )
      })}
    </>
  )
}