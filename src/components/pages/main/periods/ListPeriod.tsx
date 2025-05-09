import CustomCard from '@/components/common/CustomCard'
import SearchBar from '@/components/common/SearchBar'
import { IPeriod } from '@/data/domain/Period'
import NoResults from '@/components/common/NoResults'
import DeleteModal from '@/components/common/DeleteModal'
import FloatingButton from '@/components/common/FloatingButton'
import FormPeriod from './FormPeriod'
import { useFetchPeriods } from './useFetchPeriods'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import EventIcon from '@mui/icons-material/Event'
import { format } from 'date-fns/format'
import { parseISO } from 'date-fns/parseISO'
import { ClockClockwise } from '@phosphor-icons/react/dist/icons/ClockClockwise'
import Box from '@mui/material/Box/Box'
import Typography from '@mui/material/Typography/Typography'
import Grid2 from '@mui/material/Grid2/Grid2'
import Stack from '@mui/material/Stack/Stack'

export default function ListPeriod() {
  const {
    periods,
    searchQuery,
    handleSearch,
    openDelete,
    setOpenDelete,
    selectedPeriod,
    handleDeleteClick,
    handleConfirmDelete,
    openForm,
    setOpenForm,
    editingPeriod,
    setEditingPeriod,
    handleFormSubmit
  } = useFetchPeriods()

  const handleOpenFormToAdd = () => {
    setEditingPeriod(null)
    setOpenForm(true)
  }

  const handleOpenFormToEdit = (period: IPeriod) => {
    setEditingPeriod(period)
    setOpenForm(true)
  }

  const filteredPeriods = periods.filter((period) =>
    period.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <Box sx={{ mt: 5, px: 3, overflowY: 'auto', pb: 1 }} width="100%">
      <Typography variant="h1" gutterBottom>
        <ClockClockwise size={32} />
        Periodos
      </Typography>

      <Box
        position="sticky"
        top="0"
        zIndex="10"
        sx={{ backgroundColor: 'white', height: 'fit-content', mb: 2 }}
      >
        <SearchBar
          onSearch={handleSearch}
          options={periods.map((period) => period.title)}
        />
      </Box>

      <Grid2 container spacing={3} justifyContent="center">
        {filteredPeriods.length > 0 ? (
          filteredPeriods.map((period) => (
            <CustomCard
              key={period.id}
              title={period.title}
              onEdit={() => handleOpenFormToEdit(period)}
              onDelete={() => handleDeleteClick(period)}
              height={190}
              width={350}
            >
              <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                <CalendarMonthIcon fontSize="small" color="primary" />
                <Typography variant="body2">
                  Fecha de inicio:{' '}
                  {format(parseISO(period.startDate), 'dd/MM/yyyy')}
                </Typography>
              </Stack>

              <Stack direction="row" spacing={1} alignItems="center">
                <EventIcon fontSize="small" color="primary" />
                <Typography variant="body2">
                  Fecha de fin: {format(parseISO(period.endDate), 'dd/MM/yyyy')}
                </Typography>
              </Stack>
            </CustomCard>
          ))
        ) : (
          <NoResults />
        )}
      </Grid2>

      <DeleteModal
        open={openDelete}
        value={selectedPeriod?.title || ''}
        onCancel={() => setOpenDelete(false)}
        onConfirm={handleConfirmDelete}
      />

      <FormPeriod
        open={openForm}
        handleClose={() => setOpenForm(false)}
        onSubmit={handleFormSubmit}
        initialData={editingPeriod || undefined}
        isEdit={!!editingPeriod}
      />

      <FloatingButton onClick={handleOpenFormToAdd} />
    </Box>
  )
}
