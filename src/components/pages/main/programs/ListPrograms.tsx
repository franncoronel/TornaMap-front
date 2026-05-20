import CustomCard from '@/components/common/CustomCard'
import { Typography, Box, Grid2 } from '@mui/material'
import SearchBar from '@/components/common/SearchBar'
import { IProgram } from '@/data/domain/Program'
import NoResults from '@/components/common/NoResults'
import DeleteModal from '@/components/common/DeleteModal'
import FloatingButton from '@/components/common/FloatingButton'
import FormProgram from './FormProgram'
import { useFetchPrograms } from './useFetchPrograms'
import { GraduationCap } from '@phosphor-icons/react/dist/icons/GraduationCap'
import BackButton from '@/components/common/BackButton'

export default function ListPrograms() {
  const {
    programs,
    searchQuery,
    handleSearch,
    openDelete,
    setOpenDelete,
    selectedProgram,
    handleDeleteClick,
    handleConfirmDelete,
    openForm,
    setOpenForm,
    editingProgram,
    setEditingProgram,
    handleFormSubmit
  } = useFetchPrograms()

  const handleOpenFormToAdd = () => {
    setEditingProgram(null)
    setOpenForm(true)
  }

  const handleOpenFormToEdit = (program: IProgram) => {
    setEditingProgram(program)
    setOpenForm(true)
  }

  const filteredPrograms = programs.filter((program) =>
    program.name.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  return (
    <Box className="interactive-page" sx={{ pb: 1, gap: '1rem' }}>
      <header className="interactive-page-header">
      <BackButton />
      <Typography variant="h1" gutterBottom className="interactive-page-title">
        <GraduationCap size={32} style={{ marginRight: 8 }}/>
        Carreras o Programas
      </Typography>
    </header>
      <Box
        position="sticky"
        top="0"
        zIndex="10"
        sx={{ backgroundColor: 'white', height: 'fit-content', mb: 2 }}
      >
        <SearchBar
          onSearch={handleSearch}
          options={programs.map((program) => program.name)}
        />
      </Box>

      <Grid2 container spacing={3} justifyContent="center">
        {filteredPrograms.length > 0 ? (
          filteredPrograms.map((program) => (
            <CustomCard
              key={program.id}
              title={program.name}
              onEdit={() => handleOpenFormToEdit(program)}
              onDelete={() => handleDeleteClick(program)}
              expandable
            >
              <Typography variant="body1">{program.description}</Typography>
            </CustomCard>
          ))
        ) : (
          <NoResults />
        )}
      </Grid2>

      <DeleteModal
        open={openDelete}
        value={selectedProgram?.name || ''}
        onCancel={() => setOpenDelete(false)}
        onConfirm={handleConfirmDelete}
      />

      <FormProgram
        open={openForm}
        handleClose={() => setOpenForm(false)}
        onSubmit={handleFormSubmit}
        initialData={editingProgram || undefined}
        isEdit={!!editingProgram}
      />

      <FloatingButton onClick={handleOpenFormToAdd} />
    </Box>
  )
}
