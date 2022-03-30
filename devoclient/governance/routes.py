from flask import Blueprint, flash, redirect, render_template, url_for

from devoclient.governance.forms import ProposalForm

gv = Blueprint('gv', __name__)

@gv.route("/")
@gv.route("/home")
def home():
    return render_template('home.html')

@gv.route("/governance")
def governance():
    return render_template('governance.html')

@gv.route("/proposals")
def proposals():
    return render_template('proposals.html')

@gv.route("/help")
def help():
    return render_template('help.html')

@gv.route("/report_error")
def report_error():
    return render_template('report_error.html')


@gv.route("/proposals/new", methods=['GET', 'POST'])
def new_proposal():
    form = ProposalForm()
    if form.validate_on_submit():
        flash('Your Proposal has been created!', 'successful')
        return redirect(url_for('gv.gview'))
    return render_template('create_proposal.html', title="Create Proposal", form=form, legend='Create a new Proposal')
