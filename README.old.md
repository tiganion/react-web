Learning React here

PROs
* really small
* really good for SPAs (single page apps)
* 'highly' modular

CONs
*  bad for SEO? (this is a problem for all SPAs)


** In react everything is a component
Every componets needs to have/know 2 things
1) how to render itself
2) what other components it needs

** Data flows one way, like waterfall
It should go from top to bottom, from the root to it's children
! Children are allowed to pass data up to the parents, as in call calbacks and stuff - they
are not allowed to change the state directly in the parent

** State
* Stateless and statefull componets
* the state should be internal to a component

** Properties
 These are passed from the parent to it's children components
 Should not be stored in the component state
