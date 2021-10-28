const urlValue = (string: string) => {
  const value = {
    page: '',
    count: '',
    projectId: '',
  }

  if (string.includes('?')) {
    const page = string.split('?')[1].split('&')[0].split('=')[1]
    value.page = page

    const count = string.split('?')[1].split('&')[1].split('=')[1]
    value.count = count

    return value
  }
  const projectId = string.split('dashboards/')[1]
  value.projectId = projectId

  return value
}

export default urlValue
