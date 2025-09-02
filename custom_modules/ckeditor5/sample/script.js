ClassicEditor.create(document.querySelector('.editor'), {
  // Editor configuration.
})
  .then(editor => {
    window.editor = editor;
  })
  .catch(handleSampleError);

function handleSampleError(error) {
  const issueUrl = 'https://github.com/ckeditor/ckeditor5/issues';

  const message = [
    'Oops, something went wrong!',
    `Please, report the following error on ${issueUrl} with the build id "nu42m3t3fmf1-f81aamk1ukxr" and the error stack trace:`,
  ].join('\n');

  console.error(message);
  console.error(error);
}
