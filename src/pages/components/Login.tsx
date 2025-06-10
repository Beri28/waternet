// --- Login Page ---
const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogin = (role: 'field_officer' | 'planner' | 'ngo') => {
    setLoading(true);
    // Simulate login delay
    setTimeout(() => {
      login(role);
      setLoading(false);
    }, 1000);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <AccountCircleIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
        <Typography component="h1" variant="h5" gutterBottom>
          Sign In
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center" sx={{ mb: 3 }}>
          Select a user role to simulate access.
        </Typography>
        <Box sx={{ width: '100%' }}>
          <Button
            fullWidth
            variant="contained"
            sx={{ mb: 2, py: 1.5 }}
            onClick={() => handleLogin('planner')}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Login as Government Planner'}
          </Button>
          <Button
            fullWidth
            variant="contained"
            sx={{ mb: 2, py: 1.5 }}
            onClick={() => handleLogin('field_officer')}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Login as Field Officer'}
          </Button>
          <Button
            fullWidth
            variant="contained"
            sx={{ mb: 2, py: 1.5 }}
            onClick={() => handleLogin('ngo')}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Login as NGO Representative'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};