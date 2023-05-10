import { Box, makeStyles, Paper, Grid, MenuItem, InputLabel, Typography, Container } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useEffect } from 'react';
import ToggleFilter from './components/ToggleFilter';
import EmptyData from './components/EmptyData';
import { InputField, SelectField, TextAreaField } from 'components/FormFields';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {
  applicationActions,
} from './applicationSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    paddingTop: theme.spacing(5),
  },
  select_question: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(2),
    background: '#FFFFFF',
    boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
    borderRadius: '10px',
  },
  body_content: {
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    padding: theme.spacing(2),
    background: '#FFFFFF',
    boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
    borderRadius: '10px',
    height: 'calc(100vh - 300px)'
  },
  content_text: {
    textAlign: 'left',
  },
  grid_item: {
    textAlign: 'center'
  },
  loading: {
    position: 'absolute',
    top: theme.spacing(-1),
    width: '100%',
  },
}));

const listQuestions = [
  'Công đoàn là gì và chức năng của công đoàn là gì?',
  'Tôi có quyền lợi gì khi trở thành thành viên của công đoàn?',
  'Tôi có thể đăng ký tham gia công đoàn như thế nào?',
  'Công đoàn có thể giúp tôi giải quyết các vấn đề liên quan đến điều kiện làm việc và lương bổng không?',
  'Tôi có thể đưa ra yêu cầu của mình với công đoàn không? Và công đoàn sẽ xử lý như thế nào với yêu cầu của tôi?',
  'Công đoàn có thể cung cấp cho tôi các chương trình đào tạo hoặc hỗ trợ phát triển nghề nghiệp không?',
  'Công đoàn có thể tổ chức các hoạt động tình nguyện hoặc gây quỹ để hỗ trợ người lao động trong trường hợp khẩn cấp không?',
  'Tôi có thể được công đoàn giúp đỡ trong trường hợp xảy ra tranh chấp với nhà tuyển dụng không?',
  'Tôi có thể đăng ký tham gia các hoạt động văn hóa, thể thao do công đoàn tổ chức không?',
  'Tôi có thể tham gia các cuộc biểu tình hay đình công được tổ chức bởi công đoàn không?',
];

export default function Application() {
  const dispatch = useAppDispatch();

  const classes = useStyles();

  useEffect(() => {
    dispatch(applicationActions.fetchData());
  }, [dispatch]);

  const [question, setQuestion] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setQuestion(event.target.value);
  };

  return (
    <div>
      <Box className={classes.root}>
        <Paper className={classes.select_question}>
          <FormControl style={{width: '100%'}} size="small">
            <InputLabel id="demo-select-small-label">Các câu hỏi thường gặp?</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={question}
              label="Các câu hỏi thường gặp?"
              onChange={handleChange}
            >
              {listQuestions.map((question, index) => (
                <MenuItem key={index} value={question}>
                  {question}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Paper>
      </Box>
      <Box className={classes.root}>
        <Container className={classes.body_content}>
          <Grid container>
              <Grid xs={12} className={classes.grid_item}>
                  <Typography className={classes.content_text} variant="body1" gutterBottom>
                  Công đoàn là một tổ chức chính trị - xã hội của người lao động, được thành lập và hoạt động theo quy định của pháp luật để bảo vệ quyền, lợi ích hợp pháp và chính đáng của người lao động. Chức năng chính của công đoàn là đại diện cho người lao động trong các vấn đề liên quan đến quyền lợi của họ, đàm phán và ký kết các hiệp định lao động với nhà tuyển dụng, tham gia xây dựng chính sách và pháp luật liên quan đến lao động, giám sát và kiểm tra việc thực hiện chính sách và pháp luật về lao động và hỗ trợ cho người lao động trong các vấn đề về lương bổng, điều kiện làm việc, bảo hiểm xã hội, giáo dục và đào tạo nghề nghiệp. Ngoài ra, công đoàn còn có nhiều hoạt động khác như tổ chức các chương trình đào tạo, các hoạt động văn hóa, thể thao, tình nguyện và gây quỹ để hỗ trợ người lao động trong trường hợp khó khăn hoặc khẩn cấp.
                  </Typography>
              </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
}
