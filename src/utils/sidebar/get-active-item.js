const isItemActive = (location, item, activeItemHash) => {
  const basePath = location.pathname
  const linkMatchesPathname = item.link === basePath
  const linkWithoutHashMatchesPathname =
    item.link.replace(/#.*/, ``) === basePath
  const activeItemHashFalsy = !activeItemHash || activeItemHash === `NONE`

  if (activeItemHash) {
    if (activeItemHash === `NONE` && linkWithoutHashMatchesPathname) {
      return item
    }

    if (item.link === `${basePath}#${activeItemHash}`) {
      return item
    }
  }

  if (linkMatchesPathname && activeItemHashFalsy) {
    return item
  }

  if (item.link === `${basePath}${location.hash}` && !activeItemHash) {
    return item
  }

  if (linkMatchesPathname && !location.hash && !activeItemHash) {
    return item
  }

  return false
}

// find the current active item in the sidebar
const getActiveItem = (itemList, location, activeItemHash) => {
  for (const item of itemList) {
    if (item.link) {
      if (isItemActive(location, item, activeItemHash)) return item
    }

    if (item.items) {
      const activeSubItem = getActiveItem(item.items, location, activeItemHash)
      if (activeSubItem) return activeSubItem
    }
  }

  return false
}

export default getActiveItem
