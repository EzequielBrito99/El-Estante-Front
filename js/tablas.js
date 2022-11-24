let editor = new $.fn.dataTable.Editor( {
    ajax:  '/api/staff',
    table: '#tabla',
    fields: [
        { label: 'First name', name: 'first_name' },
        { label: 'Last name',  name: 'last_name'  },
    ]
} );

$('#tabla').DataTable( {
    ajax: '/api/staff',
    dom: 'Bfrtip',
    columns: [
        { data: 'first_name' },
        { data: 'last_name' },
        // etc
    ],
    select: true,
    buttons: [
        { extend: 'create', editor: editor },
        { extend: 'edit',   editor: editor },
        { extend: 'remove', editor: editor }
    ]
} );