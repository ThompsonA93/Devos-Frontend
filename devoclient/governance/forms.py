from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, TextAreaField, DateField
from wtforms.validators import DataRequired

class ProposalForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    content = TextAreaField('Content', validators=[DataRequired()])
    #start_date = DateField('Start Date', format='%m/%d/%Y %H:%M', validators=[DataRequired()])
    #end_date = DateField('End Date', format='%m/%d/%Y %H:%M', validators=[DataRequired()])

    # TODO :: Refactor to show logged-in address
    #creatorID = StringField('Title', validators=[DataRequired()])
    
    submit = SubmitField('Publish Proposal')

