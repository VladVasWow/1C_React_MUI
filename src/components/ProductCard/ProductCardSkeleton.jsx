import { Skeleton, Grid, Card, Box } from "@mui/material"

export const ProductCardSkeleton = () => {
    return (
            <Grid item key={1} xs={12} sm={6} md={4} xl={3} spacing={1}>
                <Card sx={ {maxWidth: 345, height: "100%" }}>
                   
                        <Skeleton variant="rectangular" animation="wave" width="100%" height={140} sx={{ m:"auto" }} style={{ marginBottom: 15 }}/> 
                    <Box sx={{ p: 2}}>    
                        <Skeleton variant="text" animation="wave" sx={{ fontSize: '0.8rem', mt: "2"}} width="60%"/>
                        <Skeleton variant="text" animation="wave" sx={{ fontSize: '1.2rem' }} />
                        <Skeleton variant="text" animation="wave" sx={{ fontSize: '1.2rem' }} />
                        <Skeleton variant="text" animation="wave" sx={{ fontSize: '1.2rem' }}  width="60%" align="right" style={{ marginBottom: 15 }}/>
                        <Skeleton variant="text" animation="wave" sx={{ fontSize: '2rem' }} />
                    </Box>
                 </Card>
            </Grid>    
    )
}    