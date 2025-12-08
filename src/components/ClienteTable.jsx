import { Table, Button, Popconfirm } from 'antd';

export default function ClienteTable({ data, onEdit, onDelete }) {
  const columns = [
    { title: 'Nome', dataIndex: 'nome' },
    { title: 'Telefone', dataIndex: 'telefone' },
    {
      title: 'Endereço',
      render: (_, record) => {
        // Monta uma descrição completa do endereço incluindo CEP
        const partes = [
          record.logradouro,
          record.numero,
          record.complemento,
          record.bloco,
          record.andar,
          record.referencia,
          record.cep ? `CEP: ${record.cep}` : null
        ].filter(Boolean); // remove valores nulos ou undefined

        return partes.length > 0 ? partes.join(', ') : 'Não informado';
      }
    },
    {
      title: 'Ações',
      render: (_, record) => (
        <>
          <Button size="small" onClick={() => onEdit(record)}>Editar</Button>
          <Popconfirm title="Excluir?" onConfirm={() => onDelete(record.id)}>
            <Button danger size="small" style={{ marginLeft: 8 }}>Excluir</Button>
          </Popconfirm>
        </>
      )
    }
  ];

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={data}
      pagination={{ pageSize: 5 }}
      scroll={{ x: 'max-content' }}
    />
  );
}