"""empty message

Revision ID: cd576ed84b9e
Revises: a476124cb16d
Create Date: 2021-01-31 12:54:57.866011

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'cd576ed84b9e'
down_revision = 'a476124cb16d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('todos', sa.Column('slug', sa.String(length=255), nullable=False))
    op.alter_column('todos', 'updated_at',
               existing_type=mysql.DATETIME(),
               nullable=False)
    op.create_unique_constraint(None, 'todos', ['slug'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'todos', type_='unique')
    op.alter_column('todos', 'updated_at',
               existing_type=mysql.DATETIME(),
               nullable=True)
    op.drop_column('todos', 'slug')
    # ### end Alembic commands ###
