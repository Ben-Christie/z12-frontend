export const selectStyling = {
  control: (baseStyles: any, state: any) => ({
    ...baseStyles,
    boxShadow: state.isFocused ? '#f97316' : 'none',
    borderColor: state.isFocused ? '#f97316' : 'none',
    borderRadius: '10px',
    padding: '0.2rem',
    outlineColor: state.isFocused ? '#f97316' : 'none',
    borderWidth: '3px',
    '&:hover': {
      borderColor: '#f97316'
    }
  })
}