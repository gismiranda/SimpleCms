import { Card, CardContent, Typography, Box, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledCard = styled(Card)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',
    maxHeight: 200,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
}));

export const CardContentStyled = styled(CardContent)({
    flexGrow: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
});

export const CardTitle = styled(Typography)(({ theme }) => ({
    color: 'black',
    marginBottom: theme.spacing(1),
}));

export const Tags = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
    marginTop: theme.spacing(1),
}));

export const Header = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
}));

export const DeleteButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    color: theme.palette.error.main,
}));

export const EditButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(6), // Adjust as needed
    color: theme.palette.info.main,
}));